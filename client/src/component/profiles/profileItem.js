import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link
          to={`/profile/${_id}`}
          className='btn btn-primary'
        >
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map(
          (
            skill,
            index //slice(0, 4): This method is used to create a shallow copy of a portion of the skills array. It selects up to the first four elements (from index 0 to index 3 inclusive). This ensures that only a maximum of four skills are displayed.
          ) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check' /> {skill}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
