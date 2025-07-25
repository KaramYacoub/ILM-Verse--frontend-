import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2, Clock, CheckCircle, PlayCircle } from "lucide-react";
import useParentsStore from "../../../store/ParentStore";
import { formatDate, formatTime } from "../../../utils/utils";

function ParentShowQuizzes() {
  const { course_id, student_id } = useParams();
  const navigate = useNavigate();
  const { quizzes, getQuizzes, loading } = useParentsStore();

  // fetch all the quizzes for the student in course
  useEffect(() => {
    const fetchQuizzes = async () => {
      await getQuizzes(course_id, student_id);
    };
    fetchQuizzes();
  }, [course_id, getQuizzes, student_id]);

  const handleShowResult = (quiz) => {
    navigate(
      `/parent/course/${course_id}/${student_id}/quizes/${quiz.quiz_id}/mark`,
      {
        state: { quiz },
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-3xl text-primary font-bold mb-6">Quizzes</h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-primary text-base-100">
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Total Points</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(quizzes) && quizzes.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No quizzes available for this course
                </td>
              </tr>
            ) : (
              Array.isArray(quizzes) &&
              quizzes.map((quiz) => {
                const status = quiz.status.toLowerCase();
                return (
                  <tr key={quiz.quiz_id}>
                    <td className="font-semibold">{quiz.title}</td>
                    <td>{formatDate(quiz.start_date)}</td>
                    <td>
                      {formatTime(quiz.start_time)} -{" "}
                      {formatTime(quiz.end_time)}
                    </td>
                    <td>{quiz.duration} minutes</td>
                    <td>{quiz.total_points} pts</td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {status === "upcoming" && (
                          <div className="flex gap-1 badge badge-warning p-3 text-base-100">
                            <Clock className="w-5 h-5" />
                            <span>Upcoming</span>
                          </div>
                        )}
                        {status === "finished" && (
                          <div className="flex gap-1 badge badge-error p-3 text-base-100">
                            <CheckCircle className="w-5 h-5" />
                            <span>Finished</span>
                          </div>
                        )}
                        {status === "able to start" && (
                          <div className="flex gap-1 badge badge-success p-3 text-base-100">
                            <PlayCircle className="w-5 h-5" />
                            <span>Available</span>
                          </div>
                        )}
                        {status === "not submitted" && (
                          <div className="flex gap-1 badge badge-neutral p-3 text-base-100">
                            <Clock className="w-5 h-5" />
                            <span>Not Submitted</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td>
                      <td>
                        {status === "able to start" ? (
                          <button
                            className="btn btn-sm btn-ghost disabled"
                            disabled
                          >
                            Not Available for Parents
                          </button>
                        ) : status === "finished" && quiz.able_to_view ? (
                          <button
                            onClick={() => handleShowResult(quiz)}
                            className="btn btn-sm btn-secondary"
                          >
                            View Results
                          </button>
                        ) : status === "finished" ? (
                          <button
                            className="btn btn-sm btn-ghost disabled"
                            disabled
                          >
                            Results Not Available
                          </button>
                        ) : status === "not submitted" ? (
                          <button
                            className="btn btn-sm btn-outline btn-warning"
                            disabled
                          >
                            Not Submitted
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-ghost disabled"
                            disabled
                          >
                            Not Available
                          </button>
                        )}
                      </td>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParentShowQuizzes;
