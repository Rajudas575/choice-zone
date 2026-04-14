import React from "react";
import ProfileFildCard from "./ProfileFildCard";
import { useAppSelector } from "../../../tempReduxToolkit/store";

const UserDetails = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="space-y-5">
      <ProfileFildCard keys={"Name:"} value={user.user?.fullName} />
      <ProfileFildCard keys={"Email:"} value={user.user?.email} />
      <ProfileFildCard
        keys={"Mobile:"}
        value={user.user?.mobile || "Not Provided"}
      />
    </div>
  );
};

export default UserDetails;
