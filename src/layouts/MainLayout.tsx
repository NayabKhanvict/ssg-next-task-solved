import { FunctionComponent, PropsWithChildren, useState } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import {
  Button,
  SkeletonLoader,
  UserProfileCard,
  ErrorMessage,
} from "@/components";
import { Person } from "@/utils/common/person";
import { User } from "@/types/UserProfilesTypes";
import { fetchData } from "@/utils/api/userProfileApi";
const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePersonSelection = async (person: Person) => {
    setLoading(true);
    setSelectedPerson(person);
    setError(null);
    try {
      const data = await fetchData(person);
      setUserData(data);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={classNames(
        inter.className,
        "h-screen w-screen",
        "flex flex-col items-center"
      )}
    >
      <div className={classNames("flex gap-2", "mt-4")}>
        {Object.values(Person).map((person) => (
          <Button
            onClick={() => handlePersonSelection(person)}
            key={person}
            active={selectedPerson === person}
          >
            {person}
          </Button>
        ))}
      </div>
      <div
        className={classNames(
          "flex flex-col justify-center items-center",
          "mt-4"
        )}
      >
        {loading ? (
          <SkeletonLoader />
        ) : (
          userData && <UserProfileCard user={userData} />
        )}
        {error && <ErrorMessage message={error} />}{" "}
      </div>
    </main>
  );
};
