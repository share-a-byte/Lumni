"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GroupPage = (params: { code: string }) => {
  const router = useRouter();
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleAccountSelection = (selection: "existing" | "new") => {
    if (selection === "existing") {
      router.push(`/login?code=${params.code}`);
    } else {
      router.push(`/signup?code=${params.code}`);
    }
  };

  return (
    <div>
      <h1>Welcome to the Group</h1>
      <p>Access code: {params.code}</p>
      <button onClick={() => handleAccountSelection("existing")}>
        Log in with existing account
      </button>
      <button onClick={() => handleAccountSelection("new")}>
        Create a new account
      </button>
    </div>
  );
};

export default GroupPage;
