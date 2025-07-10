import { useNewActionModal } from "../../store/useNewActionModal";
import StepSelectAction from "./StepSelectAction";
import StepGenerateContent from "./StepGenerateContent";
import { StepFinalForm } from "./StepFinalForm";

export function NewActionModal() {
  const { isOpen, step } = useNewActionModal();

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-y-30.5 right-0 bottom-0
        z-50
        flex
      "
    >
      <div
        className="
          w-[500px]
          bg-gray-200
          shadow-lg
          h-full
          overflow-y-auto
          hide-scrollbar
          border-l
          border-gray-00
        "
      >
        {step === 1 && <StepSelectAction />}
        {step === 2 && <StepGenerateContent />}
        {step === 3 && <StepFinalForm />}
      </div>
    </div>
  );
}
