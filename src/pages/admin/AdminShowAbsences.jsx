import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAdminStore } from "../../store/AdminStore";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { formatDate, getDayOfWeek } from "../../utils/utils";

function AdminShowAbsences() {
  const { student_id, section_id } = useParams();
  const navigate = useNavigate();

  const { getStudentAbsences } = useAdminStore();

  const [loading, setLoading] = useState(false);
  const [absences, setAbsences] = useState([]);

  // Fetch stuent absences
  useEffect(() => {
    setLoading(true);
    try {
      const fetchAbsence = async () => {
        const allAbsences = await getStudentAbsences(student_id, section_id);
        setAbsences(allAbsences);
      };
      fetchAbsence();
    } catch (error) {
      console.log(error.response.data.error || error.message);
    } finally {
      setLoading(false);
    }
  }, [student_id, section_id, getStudentAbsences]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pb-5">
      <AdminNavbar />

      <div className="p-4 sm:p-6 space-y-6 w-full max-w-5xl bg-base-100 rounded-lg shadow-md mt-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <h2 className="text-2xl sm:text-4xl font-bold text-primary truncate">
            Student Absences
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost w-full sm:w-auto"
          >
            ← Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="animate-spin" size={50} />
          </div>
        ) : absences?.absenceDates?.length > 0 ? (
          <>
            <div className="stats bg-base-300 text-center shadow">
              <div className="stat">
                <div className="stat-title text-base-content font-semibold">
                  Total Absences
                </div>
                <div className="stat-value text-2xl sm:text-4xl font-bold">
                  {absences.absenceCount}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto bg-base-200 rounded-lg shadow">
              <table className="table w-full text-center text-xs sm:text-base">
                <thead>
                  <tr className="bg-primary text-primary-content">
                    <th>#</th>
                    <th>Date</th>
                    <th>Day</th>
                  </tr>
                </thead>
                <tbody>
                  {absences.absenceDates.map((date, index) => (
                    <tr key={index} className="hover:bg-base-300">
                      <th>{index + 1}</th>
                      <td>{formatDate(date)}</td>
                      <td>{getDayOfWeek(date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="alert alert-info text-center shadow-lg flex flex-col sm:flex-row items-center justify-center gap-2">
            <AlertCircle className="stroke-current flex-shrink-0 h-6 w-6" />
            <span>No absence records found for this student.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminShowAbsences;
