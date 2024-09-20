import { useEffect, useState } from "react";
import { Department, Student } from "../../lib/globals";
import { getDepartmentById } from "../../lib/department";

export function StudentInfo({ student }: { student: Student | null }) {
  const [department, setDepartment] = useState<Department | null>();

  useEffect(() => {
    if (!student) return;
    const fetchDepartment = async () => {
      const department = await getDepartmentById(student.departmentId);
      setDepartment(department);
    };
    fetchDepartment();
  }, [student]);

  return (
    <div className="flex-1 md:p-10">
      <div className="w-full md:h-full h-[20rem] border-4 border-dashed flex flex-col items-center justify-center">
        {student ? (
          <div className="space-y-2 text-left">
            <h2 className="text-xl font-semibold">Student Information</h2>
            <p>
              <strong>Name:</strong> {student.firstName} {student.lastName}
            </p>
            <p>
              <strong>Department:</strong> {department?.name}
            </p>
            <p>
              <strong>Year Level:</strong> {student.yearLevel}
            </p>
          </div>
        ) : (
          <div className="m-auto flex items-center gap-2">
            <p className="text-lg text-black/70">No student info</p>
          </div>
        )}
      </div>
    </div>
  );
}
