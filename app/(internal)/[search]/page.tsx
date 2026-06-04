import { UserProfileCard } from "@/components/profile/user-profile.card";
import { UserProfileError } from "@/components/profile/user-profile.error";
import { unwrap } from "@/lib/api.utls";
import { IUserProfile } from "@/types/User.type";

type Props = {
  params: Promise<{
    search?: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { search } = await params;

  if (!search) {
    return <div>No search query provided.</div>;
  }

  const [data, error] = await unwrap<IUserProfile>(
    fetch(
      `http://localhost:3000/api/search?query=${encodeURIComponent(search)}`,
    ).then((res) => res.json()),
  );

  if (error) {
    return UserProfileError({ message: error.message });
  }

  return UserProfileCard({ profile: data! });
};

export default page;
