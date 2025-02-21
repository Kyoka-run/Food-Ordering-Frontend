import React from "react";
import AddressCard from "./AddressCard";
import { useSelector } from "react-redux";

const UserAddress = () => {
  const {auth} = useSelector(state => state)

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-5 font-semibold">Addresses</h1>
      <div className="flex justify-center flex-wrap gap-3">
        {auth.user?.addresses.map((item) => (
          <AddressCard item={item}/>
        ))}
      </div>
    </div>
  );
};

export default UserAddress;
