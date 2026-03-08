import { useState } from "react";

type FormValues = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

type FormErrors = {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
};

const initialValues: FormValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(formValues: FormValues) {
    const newErrors: FormErrors = {};

    if (formValues.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    if (formValues.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formValues.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setValues(initialValues);
    } else {
      setSubmitted(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1>Contact</h1>
        <p style={{ color: "var(--muted)" }}>
          Have a question? Send us a message.
        </p>

        {submitted && (
  <p
    style={{
      padding: 14,
      borderRadius: 6,
      color: "#303030",
    }}
  >
            Your message was sent successfully.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "grid", gap: 16, marginTop: 20 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.subject && <p style={errorStyle}>{errors.subject}</p>}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={values.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: "vertical" }}
            />
            {errors.message && <p style={errorStyle}>{errors.message}</p>}
          </div>

          <button
            type="submit"
            style={{
              padding: "12px 16px",
              borderRadius: 3,
              border: "1px solid var(--text)",
              background: "var(--text)",
              color: "white",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 3,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
  font: "inherit",
};

const errorStyle: React.CSSProperties = {
  margin: 0,
  color: "#b42318",
  fontSize: 14,
};