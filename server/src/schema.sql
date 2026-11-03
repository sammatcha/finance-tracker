CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    date TEXT,
    total NUMERIC,
    emergency NUMERIC,
    loan NUMERIC,
    student_loan NUMERIC,
    travel NUMERIC,
    invest NUMERIC,
    left_over NUMERIC
);
