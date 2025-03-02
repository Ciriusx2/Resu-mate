import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="max-w-screen-2xl mx-auto py-6 px-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
