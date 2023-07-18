import { Link } from "react-router-dom";

interface Charity {
  logoUrl: string;
  coverImageUrl: string;
  name: string;
  description: string;
  ein: string;
  tags: string[];
}

interface CharityProps {
  charity: Charity;
}

const CharityCard: React.FC<CharityProps> = ({ charity }) => {
  return (
    <div className="card">
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
            <span
              key={index}
              className="badge badge-pill badge-info mr-1 tag-pill"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/charity/${charity.ein}`} className="btn btn-primary mt-2">
          More Info
        </Link>
      </div>
    </div>
  );
};

export default CharityCard;
