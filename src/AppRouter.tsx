// AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { NewActionModal } from "./components/ActionModal/NewActionModal";
import StepSelectAction from "./components/ActionModal/StepSelectAction";
import StepGenerateContent from "./components/ActionModal/StepGenerateContent";
import { StepFinalForm } from "./components/ActionModal/StepFinalForm";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="modal" element={<NewActionModal />}>
            <Route index element={<StepSelectAction />} />
            <Route path="generate" element={<StepGenerateContent />} />
            <Route path="form" element={<StepFinalForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
