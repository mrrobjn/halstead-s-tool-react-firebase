import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    fontSize: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  },
  table: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    flexGrow: 1,
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
  calculteContainer: {
    marginLeft: 50,
    marginTop: 10,
    fontSize: 10,
  },
  calculateText: {
    marginBottom: 10,
  },
});

const ReactPdf = ({ singleReport }) => {
  const distinctOpertors =
    singleReport?.distinctOperatorsWithoutQuote.length +
    (singleReport?.stringGetter.length > 0 ? 1 : 0);
  const distinctOperands =
    singleReport?.distinctOperandsWithoutString.length +
    (singleReport?.stringGetter.length > 0 ? 1 : 0);
  const programVocabulary = distinctOpertors + distinctOperands;
  const totalOperators =
    singleReport?.totalOperatorsWithoutQuote.length +
    singleReport?.stringGetter.length;
  const totalOperands =
    singleReport?.totalOperandsWithoutString.length +
    singleReport?.stringGetter.length;
  const programLength = totalOperators + totalOperands;
  const programVolume = programLength * Math.log2(programVocabulary);
  const programEstimatedLength =
    distinctOpertors * Math.log2(distinctOpertors) +
    distinctOperands * Math.log2(distinctOperands);
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        {singleReport?.filename !== "" ? (
          <>
            <View style={styles.header}>
              <Text style={{marginRight: 20}}>File Calculate: {singleReport.filename}</Text>
              <Text>Date: {singleReport?.formattedDate}</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Operators</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Number of occurences</Text>
                </View>
              </View>
              {singleReport?.distinctOperatorsWithoutQuote.map(
                (col1, index) => {
                  const col2 = singleReport.totalOperatorsWithoutQuote.filter(
                    (o) => o === col1
                  ).length;
                  return (
                    <View key={index} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{col1}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{col2}</Text>
                      </View>
                    </View>
                  );
                }
              )}
              {singleReport?.stringGetter.length > 0 ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>"..."</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {singleReport?.stringGetter.length}
                    </Text>
                  </View>
                </View>
              ) : (
                ""
              )}
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Operands</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Number of occurences</Text>
                </View>
              </View>
              {singleReport?.distinctOperandsWithoutString.map(
                (col1, index) => {
                  const col2 = singleReport.totalOperandsWithoutString.filter(
                    (o) => o === col1
                  ).length;
                  return (
                    <View key={index} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{col1}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{col2}</Text>
                      </View>
                    </View>
                  );
                }
              )}
              {singleReport?.stringGetter.length > 0 ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>string</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {singleReport?.stringGetter.length}
                    </Text>
                  </View>
                </View>
              ) : (
                ""
              )}
            </View>
            <View style={styles.calculteContainer}>
              <Text style={styles.calculateText}>
                Number of distinct operators in the program: u1 ={" "}
                {distinctOpertors}
              </Text>
              <Text style={styles.calculateText}>
                Number of distinct operands in the program: u2 ={" "}
                {distinctOperands}
              </Text>
              <Text style={styles.calculateText}>
                Program vocabulay: u = u1 + u2 = {programVocabulary}
              </Text>
              <Text style={styles.calculateText}>
                Total number of occurences of operators in the program: N1 ={" "}
                {totalOperators}
              </Text>
              <Text style={styles.calculateText}>
                Total number of occurences of operands in the program: N2 ={" "}
                {totalOperands}
              </Text>
              <Text style={styles.calculateText}>
                Program length: N = N1 + N2 = {programLength}
              </Text>
              \
              <Text style={styles.calculateText}>
                Program volume: V = N log2 u = {programLength} log2(
                {programVocabulary}) = {programVolume}
              </Text>
              <Text style={styles.calculateText}>
                Program estimated length: N^ = u1 log(u1) + u2 log(u2) ={" "}
                {distinctOpertors} log2({distinctOpertors}) + {distinctOperands}{" "}
                log2({distinctOperands}) = {programEstimatedLength}
              </Text>
            </View>
          </>
        ) : (
          ""
        )}
      </Page>
    </Document>
  );
};
export default ReactPdf;
