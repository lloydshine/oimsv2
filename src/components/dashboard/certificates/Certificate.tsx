import { CertificateRequest, Student } from "../../../lib/globals";
import {
  Document,
  Text,
  View,
  Page,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define the styles for the certificate
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 1.5,
    textAlign: "justify",
    margin: 20,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    alignSelf: "center",
  },
  signatory: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  signatureLine: {
    width: "40%",
    marginTop: 20,
    marginBottom: 5,
    alignSelf: "center",
    borderBottom: "1px solid black",
  },
});

export default function Certificate({
  request,
  student,
}: {
  request: CertificateRequest;
  student: Student;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/logo.png" />
          <Text style={styles.title}>St. Peter's College</Text>
          <Text style={styles.subtitle}>Official Certificate</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.studentName}>
            {student.firstName} {student.lastName}
          </Text>
          <Text>This is to certify that</Text>
          <Text style={styles.studentName}>
            {student.firstName} {student.lastName}
          </Text>
          <Text>has been awarded the following certificate:</Text>
          <Text style={styles.studentName}>{request.certificateType}</Text>
          <Text>on this day of {new Date().toLocaleDateString()}.</Text>
        </View>
        <View style={styles.footer}>
          <Text>Dean of Student Affairs</Text>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatory}>John Smith</Text>
        </View>
      </Page>
    </Document>
  );
}
