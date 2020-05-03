import {Button, Hidden, Typography} from "@material-ui/core";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import {ArrowDropDown, ArrowForward, LocationCity} from "@material-ui/icons";
import clsx from "clsx";
import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {FormButton} from "../components/Form/FormButton";
import EntryTable from "../components/Table/EntryTable";
import MatchTable from "../components/Table/MatchTable";
import RequestTable from "../components/Table/RequestTable";
import {Artikel} from "../domain/artikel/Artikel";
import {ArtikelKategorie} from "../domain/artikel/ArtikelKategorie";
import home from "../resources/home.svg";
import logo from "../resources/logo.svg";
import {loadAngebote} from "../state/angebot/AngeboteState";
import {loadArtikelKategorien} from "../state/artikel/ArtikelKategorienState";
import {loadArtikel} from "../state/artikel/ArtikelState";
import {loadBedarfe} from "../state/bedarf/BedarfeState";
import {loadMatches} from "../state/match/MatchesState";
import {loadPerson} from "../state/person/PersonState";
import {RootDispatch, RootState} from "../state/Store";
import {WithStylesPublic} from "../util/WithStylesPublic";
import DemandDetailsDialog from "./Dialogs/Demand/DemandDetailsDialog";
import CancelEntryDialog from "./Dialogs/Home/CancelEntryDialog";
import CancelSentRequestDialog from "./Dialogs/Home/CancelSentRequestDialog";
import OfferDetailsDialog from "./Dialogs/Offer/OfferDetailsDialog";

interface Props extends WithStylesPublic<typeof styles>, PropsFromRedux {
}

interface State {
    cancelSentRequestId?: string;
    deleteEntry?: {
        isDemand: boolean;
        name: string;
        amount: number;
        id: string;
    };
    info?: {
        id: string;
        isOffer: boolean;
        article?: Artikel;
        category?: ArtikelKategorie;
    };
}

const styles = (theme: Theme) =>
    createStyles({
        subtitle: {
            fontWeight: 500,
            marginTop: "24px",
            marginBottom: "8px"
        },
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
        header: {
            display: "flex"
        },
        logo: {
            marginLeft: "-14px"
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
            marginTop: "6em"
        },
        welcomeAreaLeft: {
            maxWidth: "700px",
            marginTop: "4em",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0
        },
        welcomeAreaRight: {
            marginLeft: "4em"
        },
        institution: {
            cursor: "pointer",
            border: "1px solid #CCC",
            borderRadius: "8px",
            padding: "4px 8px",
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            transition: theme.transitions.create("background-color"),
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)"
            }
        },
        institutionIcon: {
            color: "#53284f",
            height: "1.5em",
            width: "1.5em"
        },
        institutionText: {
            marginLeft: "12px",
            marginRight: "12px",
            display: "flex",
            flexDirection: "column"
        },
        institutionName: {
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: "14px"
        },
        institutionLocation: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "12px"
        },
        institutionEdit: {
            color: "#53284f"
        },
        cards: {
            marginTop: "4em",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
        },
        card: {
            width: "calc((100% - 1em) / 2)",
            borderRadius: "8px",
            border: "1px solid #CCC"
        },
        cardHeader: {
            color: "#007c92",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            padding: "24px 24px 0px 24px"
        },
        cardContent: {
            padding: "12px 24px"
        },
        cardLink: {
            textTransform: "none",
            fontFamily: "Montserrat, sans-serif",
            width: "100%",
            transition: theme.transitions.create("background-color"),
            justifyContent: "left",
            padding: "12px 24px",
            fontWeight: 600,
            color: "#007c92",
            "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)"
            }
        },
        cardFooterLink: {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px"
        },
        linkCards: {
            marginTop: "1.5em",
            display: "flex",
            flexWrap: "wrap"
        },
        linkCard: {
            backgroundColor: "#53284f",
            width: "calc((100% - 3em) / 4)",
            borderRadius: "8px",
            height: "48px",
            marginRight: "1em",
            "&:hover": {
                backgroundColor: "#42203f"
            }
        },
        linkCardLink: {
            color: "white"
        },
        footer: {
            marginTop: "2em",
            display: "flex"
        },
        footerText: {
            color: "rgba(0, 0, 0, 0.54)",
            marginRight: "auto"
        },
        footerLink: {
            marginLeft: "1em",
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.54)"
        }
    });

class HomeScreen extends Component<Props, State> {
    state: State = {};

    render() {
        const classes = this.props.classes!;
        const institutionId = ""; // TODO

        const curInst = this.props.person?.aktuelleInstitution;

        return (
            <>
                <div className={classes.header}>

                    <img
                        alt="RemedyMatch Logo"
                        className={classes.logo}
                        src={logo}/>

                    <div className={classes.institution}>
                        <LocationCity className={classes.institutionIcon}/>

                        <div className={classes.institutionText}>
                            <Typography className={classes.institutionName}>
                                {curInst?.institution.name}
                            </Typography>
                            <Typography className={classes.institutionLocation}>
                                {curInst?.standort.strasse} {curInst?.standort.hausnummer}, {curInst?.standort.plz} {curInst?.standort.ort}
                            </Typography>
                        </div>

                        <ArrowDropDown className={classes.institutionEdit}/>
                    </div>

                </div>

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
                            className={clsx(classes.button, classes.buttonOffer)}
                            variant="contained">
                            Material spenden
                        </FormButton>

                        <FormButton
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

                    <div className={classes.card}>

                        <Typography className={classes.cardHeader}>Meine Inserate</Typography>

                        <div className={classes.cardContent}>
                            <p>asd</p>
                            <p>asd</p>
                            <p>asd</p>
                            <p>asd</p>
                        </div>

                        <Button
                            startIcon={<ArrowForward/>}
                            variant="text"
                            className={clsx(classes.cardLink, classes.cardFooterLink)}>
                            Alle 47 Inserate anzeigen
                        </Button>

                    </div>

                    <div className={classes.card}>

                        <Typography className={classes.cardHeader}>Meine offenen Anfragen</Typography>

                        <div className={classes.cardContent}>
                            <p>asd</p>
                            <p>asd</p>
                            <p>asd</p>
                            <p>asd</p>
                        </div>

                        <Button
                            startIcon={<ArrowForward/>}
                            variant="text"
                            className={clsx(classes.cardLink, classes.cardFooterLink)}>
                            Alle 14 Anfragen anzeigen
                        </Button>

                    </div>

                </div>

                <div className={classes.linkCards}>

                    <div className={classes.linkCard}>

                        <Button
                            startIcon={<ArrowForward/>}
                            variant="text"
                            className={clsx(classes.cardLink, classes.linkCardLink)}>
                            Meine Matches anzeigen
                        </Button>

                    </div>

                    <div className={classes.linkCard}>

                        <Button
                            startIcon={<ArrowForward/>}
                            variant="text"
                            className={clsx(classes.cardLink, classes.linkCardLink)}>
                            Mein Konto anzeigen
                        </Button>

                    </div>

                </div>

                <div className={classes.footer}>
                    <Typography className={classes.footerText}>
                        &copy; RemedyMatch 2020
                    </Typography>
                    <a className={classes.footerLink} href="/de">Startseite</a>
                    <a className={classes.footerLink} href="/de/presse">Presse</a>
                    <a className={classes.footerLink} href="/de/impressum">Impressum</a>
                    <a className={classes.footerLink} href="/de/datenschutz">Datenschutz</a>
                </div>

                <OfferDetailsDialog
                    open={!!this.state.info && this.state.info.isOffer}
                    onDone={this.onDetailsDone}
                    angebot={this.props.angebote?.find(item => item.id === this.state.info?.id)}
                    artikel={this.props.artikel || []}
                    artikelKategorien={this.props.artikelKategorien || []}/>

                <DemandDetailsDialog
                    open={!!this.state.info && !this.state.info.isOffer}
                    onDone={this.onDetailsDone}
                    bedarf={this.props.bedarfe?.find(item => item.id === this.state.info?.id)}
                    artikel={this.props.artikel || []}
                    artikelKategorien={this.props.artikelKategorien || []}/>

                <CancelSentRequestDialog
                    open={!!this.state.cancelSentRequestId}
                    requestId={this.state.cancelSentRequestId}
                    isDemand={/*TODO*/ false}
                    institutionName={/*TODO*/ "Keiner"}
                    onNo={this.onCancelSentRequestNo}
                    onYes={this.onCancelSentRequestYes}/>

                <CancelEntryDialog
                    open={!!this.state.deleteEntry}
                    onNo={this.onDeleteEntryNo}
                    onYes={this.onDeleteEntryYes}
                    isDemand={this.state.deleteEntry?.isDemand}
                    articleName={this.state.deleteEntry?.name}
                    amount={this.state.deleteEntry?.amount}
                    requestId={this.state.deleteEntry?.id}/>

            </>
        )
    }

    componentDidMount = async () => {
        this.props.loadArtikel();
        this.props.loadArtikelKategorien();
        this.props.loadAngebote();
        this.props.loadBedarfe();
        this.props.loadMatches();
        this.props.loadPerson();
    };

    private onCancelSentRequest = (id?: string) => {
        if (id) {
            this.setState({
                cancelSentRequestId: id
            });
        }
    };

    private onCancelSentRequestNo = () => {
        this.setState({
            cancelSentRequestId: undefined
        });
    };

    private onCancelSentRequestYes = () => {
        this.setState({
            cancelSentRequestId: undefined
        });
    };

    private onDetailsDone = () => {
        this.setState({
            info: undefined
        });
    };

    private onDetailsClicked = (id: string) => {
        if (!this.props.angebote) {
            return;
        }

        const offer = this.props.angebote?.find(angebot => angebot.id === id);
        const demand = this.props.bedarfe?.find(bedarf => bedarf.id === id);
        const isOffer = !!offer;
        const article = this.props.artikel?.find(artikel => artikel.id === offer?.artikelId || demand?.artikelId || "");
        const category = this.props.artikelKategorien?.find(kategorie => kategorie.id === article?.artikelKategorieId);

        this.setState({
            info: {isOffer, article, category, id}
        });
    };

    private filterDemand = () => {
        return (this.props.bedarfe || []); // TODO: FILTER
    };

    private onDeleteEntry = (id: string) => {
        const demand = this.props.bedarfe?.find(bedarf => bedarf.id === id);
        const offer = this.props.angebote?.find(angebot => angebot.id === id);
        const article = this.props.artikel?.find(artikel => artikel.id === demand?.artikelId || offer?.artikelId);

        this.setState({
            deleteEntry: {
                id: id,
                isDemand: !!demand,
                name: article?.name || "",
                amount: demand?.verfuegbareAnzahl || 0
            }
        });
    };

    private onDeleteEntryYes = () => {
        this.setState({
            deleteEntry: undefined
        });
        this.props.loadAngebote();
        this.props.loadBedarfe();
    };

    private onDeleteEntryNo = () => {
        this.setState({
            deleteEntry: undefined
        });
    };

    private filterOffer = () => {
        return (this.props.angebote || []); // TODO: Filter
    };
}

const mapStateToProps = (state: RootState) => ({
    angebote: state.angebote.value,
    artikel: state.artikel.value,
    artikelKategorien: state.artikelKategorien.value,
    bedarfe: state.bedarfe.value,
    matches: state.matches.value,
    person: state.person.value
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    loadAngebote: () => dispatch(loadAngebote()),
    loadArtikel: () => dispatch(loadArtikel()),
    loadArtikelKategorien: () => dispatch(loadArtikelKategorien()),
    loadBedarfe: () => dispatch(loadBedarfe()),
    loadMatches: () => dispatch(loadMatches()),
    loadPerson: () => dispatch(loadPerson())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withStyles(styles)(HomeScreen));
