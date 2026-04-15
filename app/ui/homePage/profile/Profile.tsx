import NameForm from './Components/NameForm'
import EmailForm from './Components/EmailForm'
import PhoneForm from './Components/PhoneForm'
import { UserProfile } from '@/lib/definations'

interface UserProps {
  user: UserProfile | any;
}

const Profile: React.FC<UserProps> = ({user}) => { 
  
  return (
    <div className='p-6 max-sm:px-2 max-sm:py-4 flex flex-col gap-6 max-sm:gap-0'>
        <NameForm userId={user?.id} userName={user?.name}/>
     
        <EmailForm userId={user?.id} userEmail={user?.email}/>

        <PhoneForm userId={user?.id} userPhone={user?.phone}/>
    </div>
  )
}

export default Profile