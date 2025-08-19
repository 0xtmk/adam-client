import { Container } from "@/components/layouts/container"
import { FC } from "react"

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <div>
      <img src="/images/bg-profile.png" className="absolute left-0 right-0 top-0" alt="" />

      <Container size="blessing"></Container>
    </div>
  )
}

export default ProfilePage
