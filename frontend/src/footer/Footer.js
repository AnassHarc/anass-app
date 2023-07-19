import React from "react";
import {
Box,
Container,
Row,
//Column,
FooterLink,
Heading,
} from "./FooterStyles";

const Footer = () => {
return (
	<Box>
	<Container>
		<Row>
    <Heading>Eployees Management System by Anass Harchaoui &copy; {new Date().getFullYear()} </Heading>
			<FooterLink href="https://github.com/AnassHarc">
			<i className="fab fa-github">
				<span style={{ marginLeft: "10px" }}>
				Github
				</span>
			</i>
			</FooterLink>
			<FooterLink href="https://www.linkedin.com/in/anass-harchaoui-b13b18a0/">
			<i className="fab fa-linkedin">
				<span style={{ marginLeft: "10px" }}>
				Linkedin
				</span>
			</i>
			</FooterLink>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
