import ContactCard from "../components/ContactCard";

export default function Contact() {
  return (
    <div
      style={{
        paddingTop: "30px",   // avant 100px
        paddingBottom: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ContactCard />
    </div>
  );
}
