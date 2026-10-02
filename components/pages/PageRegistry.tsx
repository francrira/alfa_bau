import HomePage from "./HomePage";
import ServicesPage from "./ServicesPage";
import PersonnelPage from "./PersonnelPage";
import TeamsPage from "./TeamsPage";
import ReferencesPage from "./ReferencesPage";
import ProjectsPage from "./ProjectsPage";
import CompanyPage from "./CompanyPage";
import CareerPage from "./CareerPage";
import SmallProjectsPage from "./SmallProjectsPage";
import ContactPage from "./ContactPage";
export const pageRegistry = {
  "": HomePage,
  "leistungen": ServicesPage,
  "personal": PersonnelPage,
  "einsatzteams": TeamsPage,
  "referenzen": ReferencesPage,
  "projekte": ProjectsPage,
  "unternehmen": CompanyPage,
  "karriere": CareerPage,
  "kleinprojekte": SmallProjectsPage,
  "kontakt": ContactPage
};
