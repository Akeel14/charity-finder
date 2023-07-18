import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Charity {
  logoUrl: string;
  coverImageUrl: string;
  name: string;
  description: string;
  ein: string;
  tags: { id: string; title: string }[];
}

interface NonprofitResponse {
  data: {
    nonprofit: Charity;
    nonprofitTags: { id: string; title: string }[];
  };
}

const CharityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [charity, setCharity] = useState<Charity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharity = async () => {
      try {
        const response = await axios.get<NonprofitResponse>(
          `https://partners.every.org/v0.2/nonprofit/${id!}?apiKey=pk_live_2caf310116284beb94a622637fa432d0`
        );
        console.log(response.data); // log response data
        const nonprofitData = response.data.data;
        if (
          "logoUrl" in nonprofitData.nonprofit &&
          "coverImageUrl" in nonprofitData.nonprofit &&
          "name" in nonprofitData.nonprofit &&
          "description" in nonprofitData.nonprofit &&
          "ein" in nonprofitData.nonprofit
        ) {
          setCharity({
            ...nonprofitData.nonprofit,
            tags: nonprofitData.nonprofitTags.map((tag) => ({
              id: tag.id,
              title: tag.title,
            })),
          } as Charity);
        }
      } catch (error) {
        console.error("Error fetching charity data: ", error);
        setError("Failed to load charity details. Please try again later.");
      }
    };

    void fetchCharity();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!charity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card mt-3">
        <img
          src={charity.coverImageUrl}
          className="card-img-top"
          alt={`${charity.name} Cover`}
        />
        <div className="card-body">
          <img
            src={charity.logoUrl}
            className="img-thumbnail rounded-circle float-right"
            alt={`${charity.name} Logo`}
          />
          <h5 className="card-title">{charity.name}</h5>
          <p className="card-text">{charity.description}</p>
          <div className="mt-2">
            {charity.tags.map((tag, index) => (
              <span key={index} className="badge badge-pill badge-primary mr-1">
                {tag.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDetail;
