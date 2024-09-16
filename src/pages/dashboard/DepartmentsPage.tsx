import { useState } from "react";
import { useDepartment } from "../../lib/department";
import { Modal } from "../../components/Modal";
import { DepartmentForm } from "../../forms/DepartmentForm";

export default function DepartmentsPage() {
  const { departments, fetchDepartments } = useDepartment();
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Modal title="Add Department" toggleModal={toggleModal} open={open}>
        <DepartmentForm
          revalidate={fetchDepartments}
          toggleModdal={toggleModal}
        />
      </Modal>
      <main className="w-full">
        <button
          onClick={toggleModal}
          className="px-4 py-1 bg-red-950 text-white rounded-lg"
        >
          Add Department
        </button>
        {departments.map((department) => (
          <pre>{JSON.stringify(department, null, 2)}</pre>
        ))}
      </main>
    </>
  );
}
