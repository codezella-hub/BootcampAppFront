import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import responseApi from "../../services/responseApi.js";
import quizApi from "../../services/quizapi.js";
import { useAuthStore } from "../../store/authStore.js";

function ResponsesUserList() {
    const { user } = useAuthStore();
    const [responses, setResponses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const responsesPerPage = 20;
    const user_id = user?._id;

    /* ------------------------------------------------------------ */
    /* Chargement + tri LIFO                                        */
    /* ------------------------------------------------------------ */
    useEffect(() => {
        if (user_id) fetchResponses();
    }, [user_id]);

    const fetchResponses = async () => {
        try {
            const { data } = await responseApi.getResponsesByUser(user_id);

            const withTitles = await Promise.all(
                data.map(async (r) => {
                    try {
                        const { data: q } = await quizApi.getQuizById(r.quiz_id);
                        return { ...r, quizTitle: q.title };
                    } catch {
                        return { ...r, quizTitle: "N/A" };
                    }
                })
            );

            /* ------ LAST-IN → FIRST-OUT (dateAttempted décroissante) ----- */
            const sorted = withTitles.sort(
                (a, b) => new Date(b.dateAttempted) - new Date(a.dateAttempted)
            );

            setResponses(sorted);
        } catch (err) {
            console.error("Error fetching responses:", err);
        }
    };

    /* ------------------------------------------------------------ */
    /* Pagination                                                   */
    /* ------------------------------------------------------------ */
    const indexOfLast = currentPage * responsesPerPage;
    const pageItems = responses.slice(indexOfLast - responsesPerPage, indexOfLast);
    const totalPages = Math.ceil(responses.length / responsesPerPage);

    /* ------------------------------------------------------------ */
    /* Utilitaire date                                              */
    /* ------------------------------------------------------------ */
    const parseIsoDate = (isoStr) => {
        if (!isoStr) return null;
        const fixed = isoStr.replace(/\+\d{2}:\d{2}$/, "Z");
        const d = new Date(fixed);
        return Number.isNaN(d) ? null : d;
    };

    /* ------------------------------------------------------------ */
    /* Rendu                                                        */
    /* ------------------------------------------------------------ */
    return (
        <div className="col-lg-9">
            <div
                className="rts-reviewd-area-dashed table-responsive"
                style={{ whiteSpace: "nowrap" }}
            >
                <h5 className="title">My Responses</h5>

                <table className="table-reviews quiz" style={{ textAlign: "center" }}>
                    <thead>
                    <tr>
                        <th style={{ width: "18%" }}>Date</th>
                        <th style={{ width: "26%" }}>Quiz Title</th>
                        <th style={{ width: "12%" }}>Score</th>
                        <th style={{ width: "12%" }}>Status</th>
                        <th style={{ width: "20%" }}>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {pageItems.length === 0 ? (
                        <tr>
                            <td colSpan="5">No responses available.</td>
                        </tr>
                    ) : (
                        pageItems.map((resp) => {
                            const dateObj = parseIsoDate(resp.dateAttempted);
                            return (
                                <tr key={resp._id}>
                                    <td>{dateObj ? dateObj.toLocaleString() : "Invalid date"}</td>
                                    <td>{resp.quizTitle}</td>
                                    <td>{resp.score}</td>
                                    <td>
                                        {resp.score >= 50 ? (
                                            <i className="fa-regular fa-circle-check text-success" />
                                        ) : (
                                            <i className="fa-solid fa-circle-xmark text-danger" />
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/quizResult/${resp._id}`}
                                            className="modern-btn-icon details-btn"
                                        >
                                            <i className="fa-solid fa-eye" />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination-full-width">
          <span>
            Page {currentPage} of {totalPages}
          </span>
                    <div className="pagination">
                        <ul>
                            <li>
                                <a
                                    href="#0"
                                    className="prev modern-btn-icon pagination-btn"
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    style={{
                                        pointerEvents: currentPage === 1 ? "none" : "auto",
                                        opacity: currentPage === 1 ? 0.5 : 1,
                                    }}
                                >
                                    <i className="fa-solid fa-chevron-left" />
                                </a>
                            </li>

                            {[...Array(totalPages).keys()].map((page) => (
                                <li key={page + 1}>
                                    <a
                                        href="#0"
                                        onClick={() => setCurrentPage(page + 1)}
                                        className={`modern-btn-icon pagination-btn ${
                                            currentPage === page + 1 ? "active" : ""
                                        }`}
                                    >
                                        {page + 1}
                                    </a>
                                </li>
                            ))}

                            <li>
                                <a
                                    href="#0"
                                    className="next modern-btn-icon pagination-btn"
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                                    }
                                    style={{
                                        pointerEvents: currentPage === totalPages ? "none" : "auto",
                                        opacity: currentPage === totalPages ? 0.5 : 1,
                                    }}
                                >
                                    <i className="fa-solid fa-chevron-right" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResponsesUserList;
