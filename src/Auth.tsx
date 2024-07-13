import { VerificationLevel, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { useAuthStore } from "./stores/auth.store";
import { Box } from "@mui/material";

export default function Auth() {
  const authStore = useAuthStore();

  const onSuccess = (result: ISuccessResult) => {
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
    console.log(result);
    window.alert(
      "Successfully verified with World ID! Your nullifier hash is: " +
        result.nullifier_hash
    );
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit:\n", result); // Log the proof from IDKit to the console for visibility

    const data = await authStore.verify(result);

    if (data.code === "success") {
      console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
    } else {
      throw data; // Throw an error if verification fails
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 5,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center align-middle h-screen">
        <IDKitWidget
          action={import.meta.env.VITE_NEXT_PUBLIC_WLD_ACTION}
          app_id={import.meta.env.VITE_NEXT_PUBLIC_WLD_APP_ID}
          onSuccess={onSuccess}
          handleVerify={handleProof}
          verification_level={VerificationLevel.Device} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
        >
          {({ open }) => (
            <button className="border border-black rounded-md" onClick={open}>
              <div className="mx-3 my-1">Verify with World ID</div>
            </button>
          )}
        </IDKitWidget>
      </div>
    </Box>
  );
}
