import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Mentions Légales | CoFound",
  description: "Mentions légales de la plateforme CoFound",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 self-center font-medium">
                <Image src={`/imports/icon-blue.svg`} alt="Logo de CoFound" height={24} width={24} className="rounded-md" />
                CoFound
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Mentions Légales</h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Informations légales relatives à la plateforme CoFound
            </p>
            <p className="text-sm text-muted-foreground">Version à jour au : 26 octobre 2025</p>
          </div>

          <div className="space-y-8 text-foreground">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Éditeur du site</h2>
              <div className="space-y-2 leading-relaxed text-muted-foreground">
                <p>
                  Le présent site est édité par <strong className="text-foreground">Anthony DENIN</strong> et{" "}
                  <strong className="text-foreground">Ludovic ROUX</strong>, agissant à titre professionnel en attente
                  de création de la société <strong className="text-foreground">CoFound SAS</strong>.
                </p>
                <p>Adresse : Adresse professionnelle communiquée sur demande pour des raisons de confidentialité.</p>
                <p>
                  E-mail :{" "}
                  <a href="mailto:contact@cofounds.app" className="font-medium text-foreground hover:underline">
                    contact@cofounds.app
                  </a>
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Nom du site et domaines associés</h2>
              <div className="space-y-2 leading-relaxed text-muted-foreground">
                <p>Les présentes mentions légales concernent les domaines :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>
                    <a
                      href="https://cofounds.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      https://cofounds.app
                    </a>{" "}
                    — site vitrine
                  </li>
                  <li>
                    <a
                      href="https://dashboard.cofounds.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      https://dashboard.cofounds.app
                    </a>{" "}
                    — application web
                  </li>
                  <li>
                    <a
                      href="https://api.cofounds.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      https://api.cofounds.app
                    </a>{" "}
                    — interface API
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Directeur de la publication</h2>
              <div className="space-y-2 leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground">Anthony DENIN</strong>
                </p>
                <p>
                  Responsable de la rédaction : <strong className="text-foreground">Ludovic ROUX</strong>
                </p>
                <p>
                  Contact :{" "}
                  <a href="mailto:contact@cofounds.app" className="font-medium text-foreground hover:underline">
                    contact@cofounds.app
                  </a>
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Hébergement</h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Frontend (site et application web)</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>
                      Hébergeur : <strong className="text-foreground">Vercel Inc.</strong>
                    </li>
                    <li>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
                    <li>
                      Site :{" "}
                      <a
                        href="https://vercel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline"
                      >
                        https://vercel.com
                      </a>
                    </li>
                  </ul>
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="text-sm">
                      Les contenus peuvent être distribués via un réseau mondial de diffusion (CDN), entraînant des
                      transferts de données hors de l'Union européenne, encadrés par des clauses contractuelles types.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Backend / API</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>
                      Hébergeur : <strong className="text-foreground">OVH SAS (OVHcloud)</strong>
                    </li>
                    <li>Adresse : 2 rue Kellermann, 59100 Roubaix, France</li>
                    <li>Téléphone : +33 (0)9 72 10 10 07</li>
                    <li>
                      Site :{" "}
                      <a
                        href="https://www.ovhcloud.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline"
                      >
                        https://www.ovhcloud.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Propriété intellectuelle</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  L'ensemble du contenu des sites <code className="text-foreground">cofounds.app</code>,{" "}
                  <code className="text-foreground">dashboard.cofounds.app</code> et{" "}
                  <code className="text-foreground">api.cofounds.app</code> (textes, graphismes, logos, images,
                  interfaces, bases de données, code source, etc.) est protégé par le droit de la propriété
                  intellectuelle et demeure la propriété exclusive de{" "}
                  <strong className="text-foreground">CoFound</strong> ou de ses partenaires.
                </p>
                <p>
                  Toute reproduction, représentation, modification, adaptation, traduction, diffusion ou exploitation,
                  totale ou partielle, sans autorisation écrite préalable, est interdite.
                </p>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Marques et éléments distinctifs</h3>
                  <p>
                    Le nom <strong className="text-foreground">CoFound</strong>, le logo associé et les marques dérivées
                    sont des marques déposées ou en cours de dépôt auprès de l'INPI. Toute utilisation non autorisée
                    constitue une contrefaçon au sens du Code de la propriété intellectuelle.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Crédits visuels</h3>
                  <p>
                    Les icônes, illustrations et typographies utilisées proviennent de sources libres de droits
                    (notamment Lucide Icons, Google Fonts, Unsplash, Freepik) sous leurs licences respectives.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Contributions et contenus utilisateurs</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Les utilisateurs peuvent être amenés à publier des contenus sur la plateforme CoFound (par exemple :
                  descriptions de projets, échanges, documents, commentaires, visuels).
                </p>
                <p>En soumettant un contenu, l'utilisateur garantit :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>qu'il en détient les droits ou les autorisations nécessaires ;</li>
                  <li>qu'il n'enfreint aucune loi ni aucun droit de tiers ;</li>
                  <li>
                    et qu'il autorise CoFound à le reproduire, héberger, afficher et exploiter dans le cadre normal du
                    service.
                  </li>
                </ul>
                <p>
                  L'éditeur se réserve le droit de <strong className="text-foreground">modérer ou supprimer</strong>{" "}
                  tout contenu contraire à la loi, aux bonnes mœurs, ou aux présentes conditions.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Responsabilité</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur les sites.
                </p>
                <p>
                  Cependant, aucune garantie n'est donnée quant à la précision, la complétude ou l'actualité des
                  contenus.
                </p>
                <p>L'éditeur ne saurait être tenu responsable :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>d'éventuelles erreurs ou omissions,</li>
                  <li>d'une interruption de service,</li>
                  <li>d'un dysfonctionnement technique,</li>
                  <li>ou de tout dommage direct ou indirect lié à l'usage du site ou des applications.</li>
                </ul>
                <p>
                  Des liens hypertextes peuvent pointer vers des sites tiers ; CoFound décline toute responsabilité
                  quant à leurs contenus.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Utilisation d'intelligences artificielles</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Les services de CoFound peuvent intégrer des fonctionnalités reposant sur des systèmes d'intelligence
                  artificielle (génération de texte, suggestion de correspondances, analyses, etc.).
                </p>
                <p>
                  Ces contenus sont <strong className="text-foreground">générés automatiquement</strong> à partir de
                  données internes ou publiques.
                </p>
                <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/20">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                    ⚠️ Les résultats produits par ces systèmes ne constituent ni un conseil professionnel, juridique ou
                    financier, ni une recommandation ferme.
                  </p>
                  <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
                    L'utilisateur reste <strong>seul responsable</strong> de l'usage qu'il fait des informations
                    générées.
                  </p>
                </div>
                <p>
                  CoFound s'engage à ce que ces traitements reposent sur des modèles et hébergeurs conformes au{" "}
                  <strong className="text-foreground">RGPD</strong>, avec des mesures de sécurité appropriées.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Signalement d'un contenu illicite (LCEN art. 6.I.5)</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Toute personne souhaitant signaler un contenu illicite peut adresser un message à{" "}
                  <a href="mailto:contact@cofounds.app" className="font-medium text-foreground hover:underline">
                    contact@cofounds.app
                  </a>
                  , comportant :
                </p>
                <ol className="ml-6 list-decimal space-y-1">
                  <li>La date du signalement ;</li>
                  <li>Les nom, prénom, profession, domicile, nationalité, date et lieu de naissance du notifiant ;</li>
                  <li>
                    La description du contenu litigieux et son <strong className="text-foreground">URL précise</strong>{" "}
                    ;
                  </li>
                  <li>Les motifs légaux justifiant le retrait (avec références des textes de loi) ;</li>
                  <li>
                    La copie de la correspondance adressée à l'auteur ou la preuve de l'impossibilité de le contacter.
                  </li>
                </ol>
                <p>Toute notification incomplète pourra ne pas être traitée conformément à la LCEN.</p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Médiation de la consommation</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Conformément à l'article L.612-1 du Code de la consommation, tout consommateur a le droit de recourir
                  gratuitement à un médiateur en cas de litige non résolu à l'amiable.
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Médiateur désigné :</p>
                  <p>
                    <strong className="text-foreground">CNPM Médiation Consommation</strong>
                  </p>
                  <p>27 avenue de la Libération, 42400 Saint-Chamond, France</p>
                  <p>
                    Site :{" "}
                    <a
                      href="https://www.cnpm-mediation-consommation.eu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      https://www.cnpm-mediation-consommation.eu
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Données personnelles</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Les traitements de données personnelles réalisés par CoFound sont conformes au{" "}
                  <strong className="text-foreground">Règlement Général sur la Protection des Données (RGPD)</strong> et
                  à la <strong className="text-foreground">loi Informatique et Libertés</strong>.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Finalités principales :</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>création et gestion des comptes utilisateurs,</li>
                    <li>authentification (classique, SSO Google/LinkedIn, 2FA/OTP),</li>
                    <li>gestion des abonnements et paiements (via Stripe),</li>
                    <li>envoi d'e-mails transactionnels (Nodemailer/OVH),</li>
                    <li>communication et support,</li>
                    <li>statistiques anonymisées d'utilisation (ex. via Plausible ou Posthog).</li>
                  </ul>
                </div>
                <p>
                  Les données sont hébergées en France (OVHcloud) et peuvent être transférées hors UE via le réseau CDN
                  de Vercel, conformément aux <strong className="text-foreground">clauses contractuelles types</strong>{" "}
                  de la Commission européenne.
                </p>
                <p>
                  Les utilisateurs disposent de droits d'accès, de rectification, d'effacement, de portabilité, et
                  d'opposition, en écrivant à{" "}
                  <a href="mailto:contact@cofounds.app" className="font-medium text-foreground hover:underline">
                    contact@cofounds.app
                  </a>
                  .
                </p>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-sm">
                    👉 Pour plus d'informations, consultez la{" "}
                    <a href="/privacy-policy" className="font-medium text-foreground hover:underline">
                      Politique de confidentialité
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Cookies et traceurs</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>Les sites CoFound utilisent des cookies et technologies similaires pour :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>le fonctionnement du service (authentification, sessions, sécurité),</li>
                  <li>la mesure d'audience et l'amélioration des performances,</li>
                  <li>et, avec consentement, certaines fonctionnalités de personnalisation.</li>
                </ul>
                <p>
                  Vous pouvez gérer vos préférences via le{" "}
                  <strong className="text-foreground">bandeau de consentement</strong> affiché à votre première visite
                  ou à tout moment dans le <strong className="text-foreground">centre de gestion des cookies</strong>.
                </p>
                <p>Pour en savoir plus, consultez la Politique cookies.</p>
              </div>
            </section>

            {/* Section 13 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">13. Droit applicable</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Les présentes mentions légales sont régies par le{" "}
                  <strong className="text-foreground">droit français</strong>.
                </p>
                <p>
                  Tout litige relatif à leur interprétation ou à leur exécution relève de la{" "}
                  <strong className="text-foreground">compétence des juridictions françaises</strong> conformément aux
                  règles légales en vigueur.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-border pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 <strong className="text-foreground">CoFound</strong> — Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
