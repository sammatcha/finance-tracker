import Form from "./components/PaycheckForm";

export default function mainPage() {
  return(
    <div className="bg-accent max-w-lg mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Paycheck Tracker</h1>
      <Form/>
    </div>
  )
}