import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const FooterPage = () => {
  return (
    <Box>
      <h2 style={{ color: "green", textAlign: "center", marginTop: "-50px" }}>
        PetHealth: Best choice for your's pets
      </h2>
      <Container>
        <Row>
          <Column>
            <Heading>Take cary pets.</Heading>
          </Column>
          <Column>
            <Heading>Chat with clinics.</Heading>
          </Column>
          <Column>
            <Heading>Left comment about services.</Heading>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default FooterPage;
