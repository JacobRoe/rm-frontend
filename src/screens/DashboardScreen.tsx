import {Hidden, Typography, WithStyles} from "@material-ui/core";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {FormButton} from "../components/Form/old/FormButton";
import ContentCard from "../components/Content/ContentCard";
import LinkCard from "../components/Content/LinkCard";
import {InstitutionAngebot} from "../domain/angebot/InstitutionAngebot";
import {InstitutionBedarf} from "../domain/bedarf/InstitutionBedarf";
import home from "../resources/home.svg";
import {loadGestellteAngebotAnfragen} from "../state/angebot/GestellteAngebotAnfragenState";
import {loadInstitutionAngebote} from "../state/angebot/InstitutionAngeboteState";
import {loadGestellteBedarfAnfragen} from "../state/bedarf/GestellteBedarfAnfragenState";
import {loadInstitutionBedarfe} from "../state/bedarf/InstitutionBedarfeState";
import {RootDispatch, RootState} from "../state/Store";

interface Props extends WithStyles<typeof styles>, PropsFromRedux, RouteComponentProps {
}

interface State {
}

const styles = (theme: Theme) =>
    createStyles({
        button: {
            height: "48px",
            fontFamily: "Montserrat, sans-serif",
            maxWidth: "350px",
            width: "100%",
            fontWeight: 600,
            marginTop: "16px"
        },
        buttonOffer: {
            backgroundColor: "#007c92",
            "&:hover": {
                backgroundColor: "#006374"
            }
        },
        buttonDemand: {
            backgroundColor: "#53284f",
            "&:hover": {
                backgroundColor: "#42203f"
            }
        },
        welcome: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "60px",
            fontWeight: 600,
            color: "#007c92"
        },
        welcomeSubtitle: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "4em"
        },
        mainImage: {
            height: "auto",
            width: "100%",
            minWidth: "200px"
        },
        welcomeArea: {
            display: "flex",
            marginTop: "5em"
        },
        welcomeAreaLeft: {
            maxWidth: "700px",
            marginTop: "4em",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0
        },
        welcomeAreaRight: {
            marginLeft: "auto"
        },
        cards: {
            marginTop: "4em",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
        },
        cardPlaceholderAction: {
            fontWeight: 600
        },
        linkCards: {
            marginTop: "1.5em",
            display: "flex",
            flexWrap: "wrap"
        },
        adEntry: {
            padding: "4px 24px",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)"
            }
        },
        adEntryTitle: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            letterSpacing: "-0.02em"
        },
        adEntryRequests: {
            backgroundColor: "#53284f",
            borderRadius: "8px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: "12px"
        }
    });

class DashboardScreen extends Component<Props, State> {
    state: State = {};

    render() {
        const classes = this.props.classes;

        const ownCount = (this.props.institutionAngebote?.length || 0) + (this.props.institutionBedarfe?.length || 0);
        const requestCount = (this.props.gestellteAngebotAnfragen?.length || 0) + (this.props.gestellteBedarfAnfragen?.length || 0);

        return (
            <>
                <div className={classes.welcomeArea}>

                    <div className={classes.welcomeAreaLeft}>

                        <Typography
                            className={classes.welcome}>
                            Hallo, {this.props.person?.vorname}&nbsp;{this.props.person?.nachname}
                        </Typography>

                        <Typography
                            className={classes.welcomeSubtitle}>
                            Willkommen zurück bei RemedyMatch.
                        </Typography>

                        <FormButton
                            onClick={this.onCreateOfferClicked}
                            className={clsx(classes.button, classes.buttonOffer)}
                            variant="contained">
                            Material spenden
                        </FormButton>

                        <FormButton
                            onClick={this.onCreateDemandClicked}
                            className={clsx(classes.button, classes.buttonDemand)}
                            variant="contained">
                            Material suchen
                        </FormButton>

                    </div>

                    <Hidden smDown>
                        <div className={classes.welcomeAreaRight}>
                            <img
                                alt="RemedyMatch Bild"
                                className={classes.mainImage}
                                src={home}/>
                        </div>
                    </Hidden>

                </div>

                <div className={classes.cards}>

                    <ContentCard
                        title="Meine Inserate"
                        showPlaceholder={ownCount === 0}
                        actionDisabled={ownCount === 0}
                        onActionClicked={() => console.log("Inserate anzeigen")}
                        action={ownCount ? `Alle ${ownCount} Inserate anzeigen` : "Keine Inserate gefunden"}
                        placeholder={(
                            <>
                                <span>
                                    Ihre Institution hat noch keine Inserate erstellt.<br/>
                                </span>
                                <span className={classes.cardPlaceholderAction}>
                                    Klicken Sie oben, ein Inserat zu erstellen!
                                </span>
                            </>
                        )}>
                        {
                            this.mapAds().slice(0, 5).map(entry => (
                                <div className={classes.adEntry}>
                                    <span className={classes.adEntryTitle}>{entry.message}</span>
                                    {entry.requests > 0 && (
                                        <span className={classes.adEntryRequests}>{entry.requests} Anfragen</span>
                                    )}
                                </div>
                            ))
                        }
                    </ContentCard>

                    <ContentCard
                        title="Meine offenen Anfragen"
                        showPlaceholder={requestCount === 0}
                        actionDisabled={requestCount === 0}
                        onActionClicked={() => console.log("Offene Anfragen anzeigen")}
                        action={ownCount ? `Alle ${requestCount} Anfragen anzeigen` : "Keine Anfragen gefunden"}
                        placeholder={(
                            <>
                                <span>
                                    Ihre Institution hat noch keine Anfragen gestellt.<br/>
                                </span>
                                <span className={classes.cardPlaceholderAction}>
                                    Klicken Sie oben, um ein Inserat anzufragen!
                                </span>
                            </>
                        )}>
                        {
                            this.props.gestellteAngebotAnfragen?.map(anfrage => (
                                <span>{anfrage.anzahl} {anfrage.angebot?.artikel.name}</span>
                            ))
                        }
                    </ContentCard>

                </div>

                <div className={classes.linkCards}>
                    <LinkCard title="Meine Matches anzeigen" onClick={() => console.log("Matches anzeigen")}/>
                    <LinkCard title="Mein Konto anzeigen" onClick={() => console.log("Konto anzeigen")}/>
                </div>
            </>
        )
    }

    componentDidMount = async () => {
        this.props.loadGestellteAngebotAnfragen();
        this.props.loadGestellteBedarfAnfragen();
        this.props.loadInstitutionAngebote();
        this.props.loadInstitutionBedarfe();
    };

    private onCreateOfferClicked = () => {
        this.props.history.push("/angebot");
    };

    private onCreateDemandClicked = () => {
        this.props.history.push("/bedarf");
    };

    private mapAds = () => {
        const bedarfe = this.props.institutionBedarfe || [];
        const angebote = this.props.institutionAngebote || [];
        return bedarfe.map(bedarf => this.mapToAd(bedarf, true))
            .concat(angebote.map(angebot => this.mapToAd(angebot, false)));
    };

    private mapToAd = (entry: InstitutionBedarf | InstitutionAngebot, bedarf: boolean) => {
        const count = entry.verfuegbareAnzahl;
        const name = entry.artikel.name;

        const variante = entry.artikel.varianten.length > 1
            ? entry.artikel.varianten.find(variante => variante.id === entry.artikelVarianteId)?.variante
            : undefined;

        return {
            id: entry.id,
            message: `${bedarf ? "Bedarf: " : "Angebot: "} ${count}x ${name}` + (variante ? ` (${variante})` : ""),
            requests: entry.anfragen.length
        };
    }
}

const mapStateToProps = (state: RootState) => ({
    gestellteAngebotAnfragen: state.gestellteAngebotAnfragen.value,
    gestellteBedarfAnfragen: state.gestellteBedarfAnfragen.value,
    institutionAngebote: state.institutionAngebote.value,
    institutionBedarfe: state.institutionBedarfe.value,
    person: state.person.value // Wird im Menü geladen
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    loadGestellteAngebotAnfragen: () => dispatch(loadGestellteAngebotAnfragen()),
    loadGestellteBedarfAnfragen: () => dispatch(loadGestellteBedarfAnfragen()),
    loadInstitutionAngebote: () => dispatch(loadInstitutionAngebote()),
    loadInstitutionBedarfe: () => dispatch(loadInstitutionBedarfe())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRouter(withStyles(styles)(DashboardScreen)));