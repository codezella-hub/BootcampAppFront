import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center position-relative overflow-hidden"
             style={{
                 background: "linear-gradient(135deg, #111827 0%, #166534 50%, #047857 100%)"
             }}>
            {/* Simple Loading Spinner */}
            <motion.div
                className="spinner-border text-success"
                style={{
                    width: "4rem",
                    height: "4rem",
                    borderWidth: "0.25rem",
                    borderTopColor: "#22c55e",
                    borderRightColor: "rgba(34, 197, 94, 0.2)",
                    borderBottomColor: "rgba(34, 197, 94, 0.2)",
                    borderLeftColor: "rgba(34, 197, 94, 0.2)"
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;