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
import { useQuery } from "react-query";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(
    ["user", selectedPerson !== null ? selectedPerson : "null"],
    () => fetchData(selectedPerson),
    {
      enabled: selectedPerson !== null,
      retry: 1,
      retryDelay: 1000,
    }
  );

  const handlePersonSelection = (person: Person) => {
    setSelectedPerson(person);
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
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          userData && <UserProfileCard user={userData} />
        )}
        {isError && <ErrorMessage message="Error fetching user data" />}{" "}
      </div>
    </main>
  );
};
