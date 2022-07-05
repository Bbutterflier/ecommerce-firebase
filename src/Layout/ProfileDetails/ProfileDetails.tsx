import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { useUserContext } from '../../context/User/UserContext';
import './ProfileDetails.css';

const ProfileDetails: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const {
    state: { user },
    dispath,
  } = useUserContext();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispath({ type: 'LOG_OUT' });
      navigate('/');
    } catch (error) {
      console.log('error in sign out');
    }
  };
  return (
    <div className='profile-details'>
      <h2 className='profile-details__title'>My Details </h2>
      <div className='profile-details__personal-info'>
        <h4 className='profile-details__personal-info__title'>personal information</h4>
        <hr className='profile-details__line' />
        <form className='profile-details__form'>
          <Input placeholder='name' type='text' value={user.displayName} />
          <Input placeholder='phone number' type='text' value={user.phoneNumber} />
          <Button>Update</Button>
        </form>
      </div>
      <div className='profile-details__personal-info'>
        <h4 className='profile-details__personal-info__title'>Email addres</h4>
        <hr className='profile-details__line' />
        <form className='profile-details__form'>
          <Input placeholder='email' type='email' />
          <Button>Add Email</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
