import { Suspense } from "react";
import UpdatePromptForm from "./UpdatePromptForm";
const UpdatePrompt = () => {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UpdatePromptForm />
    </Suspense>
  );
};

export default UpdatePrompt;