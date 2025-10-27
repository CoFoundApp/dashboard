import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | CoFound",
  description: "Politique de confidentialité et protection des données personnelles de CoFound",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 self-center font-medium">
                <Image src={`/imports/icon-blue.svg`} alt="Logo de CoFound" height={24} width={24} className="rounded-md" />
                CoFound
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">
              Politique de Confidentialité
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Protection des données personnelles de la plateforme CoFound
            </p>
            <p className="text-sm text-muted-foreground">Dernière mise à jour : 2025</p>
          </div>

          <div className="space-y-8 text-foreground">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  La présente politique de confidentialité décrit la manière dont{" "}
                  <strong className="text-foreground">CoFound</strong> collecte, utilise et protège vos données
                  personnelles lors de l'utilisation du site web et des services accessibles via :
                </p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>
                    <a
                      href="https://cofounds.app"
                      className="text-foreground hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://cofounds.app
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dashboard.cofounds.app"
                      className="text-foreground hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://dashboard.cofounds.app
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://api.cofounds.app"
                      className="text-foreground hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://api.cofounds.app
                    </a>
                  </li>
                </ul>
                <p>
                  CoFound s'engage à respecter la législation en vigueur en matière de protection des données
                  personnelles, notamment le{" "}
                  <strong className="text-foreground">
                    Règlement Général sur la Protection des Données (RGPD – UE 2016/679)
                  </strong>{" "}
                  et la <strong className="text-foreground">loi Informatique et Libertés</strong>.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Responsable du traitement</h2>
              <div className="space-y-2 leading-relaxed text-muted-foreground">
                <p>Le responsable du traitement est :</p>
                <p>
                  <strong className="text-foreground">Anthony Denin</strong>
                </p>
                <p>
                  E-mail :{" "}
                  <a href="mailto:contact@cofounds.app" className="font-medium text-foreground hover:underline">
                    contact@cofounds.app
                  </a>
                </p>
                <p className="text-sm">
                  Adresse : Adresse professionnelle communiquée sur demande pour des raisons de confidentialité.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Données collectées</h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">a. Données fournies volontairement</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Nom, prénom, adresse e-mail, mot de passe (création de compte)</li>
                    <li>Informations de profil : compétences, rôle, projet, motivation, localisation</li>
                    <li>Messages envoyés via le formulaire de contact ou l'assistant IA</li>
                    <li>Données saisies dans les modules : matching, business plan, e-learning, assistance IA</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">b. Données techniques</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Adresse IP, type de navigateur, système d'exploitation, appareil</li>
                    <li>Données de navigation : pages consultées, durée de session, interactions</li>
                    <li>Cookies et technologies similaires (voir section 8)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">c. Données générées par l'IA</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Contenus transmis aux modèles (textes, requêtes, documents)</li>
                    <li>Résultats produits (explications, scores, suggestions, plans, etc.)</li>
                  </ul>
                  <p className="mt-2">
                    Ces données peuvent être <strong className="text-foreground">temporairement stockées</strong> pour
                    assurer le bon fonctionnement du service, la traçabilité et l'amélioration continue des algorithmes.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Finalités du traitement</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>Les données collectées sont utilisées pour :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Fournir et gérer les services proposés (comptes, projets, modules IA, etc.)</li>
                  <li>Assurer l'authentification (classique, SSO Google/LinkedIn, 2FA/OTP)</li>
                  <li>Gérer les paiements et abonnements (via Stripe)</li>
                  <li>Améliorer la qualité, la sécurité et la personnalisation du service</li>
                  <li>Communiquer avec les utilisateurs (e-mails techniques ou commerciaux, selon consentement)</li>
                  <li>Réaliser des analyses statistiques anonymisées</li>
                  <li>Respecter les obligations légales (comptabilité, sécurité, logs, facturation)</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Base légale du traitement</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>Les traitements reposent sur :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>
                    <strong className="text-foreground">L'exécution du contrat</strong> liant l'utilisateur à la
                    plateforme
                  </li>
                  <li>
                    <strong className="text-foreground">Le consentement explicite</strong> (inscription, marketing,
                    cookies, IA)
                  </li>
                  <li>
                    <strong className="text-foreground">L'intérêt légitime</strong> de CoFound (sécurité, amélioration
                    du service, lutte contre la fraude)
                  </li>
                  <li>
                    <strong className="text-foreground">Le respect d'obligations légales</strong> (facturation,
                    obligations fiscales, sécurité des systèmes)
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Durée de conservation</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="bg-muted p-4 text-left font-semibold text-foreground">Type de données</th>
                      <th className="bg-muted p-4 text-left font-semibold text-foreground">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-4">Compte utilisateur</td>
                      <td className="p-4">
                        Tant que le compte est actif, puis <strong className="text-foreground">12 mois</strong> après
                        suppression
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Données de logs</td>
                      <td className="p-4">
                        <strong className="text-foreground">6 mois</strong> maximum
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Données de paiement (factures)</td>
                      <td className="p-4">
                        <strong className="text-foreground">10 ans</strong> (obligation légale)
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Données de contact (support)</td>
                      <td className="p-4">
                        <strong className="text-foreground">12 mois</strong> après le dernier échange
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Données d'entraînement IA</td>
                      <td className="p-4">
                        <strong className="text-foreground">temporairement</strong>, puis anonymisées ou supprimées
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Cookies</td>
                      <td className="p-4">Selon leur durée propre (voir section 8)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Partage et transferts des données</h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Vos données <strong className="text-foreground">ne sont jamais revendues</strong>. Elles peuvent être
                  partagées avec :
                </p>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Hébergeurs :</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>
                      <em>Frontend</em> : <strong className="text-foreground">Vercel Inc.</strong> (États-Unis)
                      <br />
                      <span className="text-sm">
                        → participe au <strong className="text-foreground">EU–US Data Privacy Framework</strong>,
                        garantissant un niveau de protection adéquat.
                      </span>
                    </li>
                    <li>
                      <em>Backend & base de données</em> : <strong className="text-foreground">OVH SAS</strong>, France.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Sous-traitants autorisés :</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>
                      <strong className="text-foreground">Stripe Inc.</strong> (paiement sécurisé)
                    </li>
                    <li>
                      <strong className="text-foreground">Resend / OVH Mail / Nodemailer</strong> (e-mails
                      transactionnels)
                    </li>
                    <li>
                      <strong className="text-foreground">Plausible / Posthog / Google Analytics</strong> (mesure
                      d'audience)
                    </li>
                  </ul>
                </div>

                <p>
                  Tous les sous-traitants sont liés par des{" "}
                  <strong className="text-foreground">clauses contractuelles conformes au RGPD</strong>.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Cookies et technologies similaires</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>Le site utilise :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>
                    des <strong className="text-foreground">cookies essentiels</strong> (connexion, sécurité,
                    préférences),
                  </li>
                  <li>
                    des <strong className="text-foreground">cookies statistiques</strong> (analyse anonyme du trafic),
                  </li>
                  <li>
                    et, avec consentement, des <strong className="text-foreground">cookies de personnalisation</strong>.
                  </li>
                </ul>
                <p>Les cookies peuvent être gérés via :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>
                    la <strong className="text-foreground">bannière de consentement</strong> lors de la première visite,
                  </li>
                  <li>
                    ou les <strong className="text-foreground">paramètres du navigateur</strong>.
                  </li>
                </ul>
                <p>
                  Pour plus d'informations, consultez la{" "}
                  <strong className="text-foreground">Politique relative aux cookies</strong>.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Droits des utilisateurs</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>
                    <strong className="text-foreground">Accès</strong> : obtenir copie de vos données.
                  </li>
                  <li>
                    <strong className="text-foreground">Rectification</strong> : corriger toute donnée inexacte.
                  </li>
                  <li>
                    <strong className="text-foreground">Effacement</strong> (« droit à l'oubli ») : supprimer vos
                    données.
                  </li>
                  <li>
                    <strong className="text-foreground">Limitation</strong> : restreindre temporairement le traitement.
                  </li>
                  <li>
                    <strong className="text-foreground">Opposition</strong> : refuser certains traitements (notamment
                    marketing).
                  </li>
                  <li>
                    <strong className="text-foreground">Portabilité</strong> : recevoir vos données dans un format
                    structuré.
                  </li>
                </ul>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-sm">
                    📩 Pour exercer vos droits :{" "}
                    <a href="mailto:contact@cofounds.app" className="font-medium text-foreground hover:underline">
                      contact@cofounds.app
                    </a>
                  </p>
                </div>
                <p>
                  Vous disposez également du droit d'introduire une réclamation auprès de la{" "}
                  <strong className="text-foreground">CNIL</strong> :{" "}
                  <a
                    href="https://www.cnil.fr"
                    className="text-foreground hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.cnil.fr
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Sécurité des données</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>CoFound met en œuvre des mesures techniques et organisationnelles adaptées :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Chiffrement TLS/HTTPS sur l'ensemble des domaines</li>
                  <li>
                    Mots de passe hachés via <strong className="text-foreground">bcrypt</strong>
                  </li>
                  <li>Stockage sur serveurs sécurisés (OVHcloud – France)</li>
                  <li>Sauvegardes et contrôles d'accès restreints</li>
                  <li>Journalisation des accès et audits réguliers</li>
                  <li>Politique interne de confidentialité et de formation des collaborateurs</li>
                </ul>
              </div>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Spécificités liées à l'intelligence artificielle</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Certaines fonctionnalités reposent sur des systèmes d'IA (analyse de projet, matching, génération de
                  texte).
                </p>
                <p>Les données traitées servent exclusivement à :</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>fournir la fonctionnalité demandée,</li>
                  <li>améliorer la pertinence du service,</li>
                  <li>assurer la transparence et la traçabilité des résultats.</li>
                </ul>
                <p>Aucune donnée confidentielle n'est utilisée pour entraîner de modèles externes.</p>
                <p>
                  Les contenus générés automatiquement n'ont{" "}
                  <strong className="text-foreground">pas valeur de conseil professionnel</strong> ; l'utilisateur reste
                  responsable des décisions prises à partir des résultats produits.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Évolutions de la politique</h2>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  La présente politique pourra être mise à jour à tout moment pour refléter les évolutions légales,
                  techniques ou fonctionnelles du service.
                </p>
                <p>
                  Les utilisateurs seront informés des changements importants par e-mail ou via une notification sur le
                  site.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-border pt-8 text-center">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Contact DPO / RGPD</strong> :{" "}
                  <a href="mailto:contact@cofounds.app" className="text-foreground hover:underline">
                    contact@cofounds.app
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Autorité de contrôle compétente</strong> : Commission Nationale de
                  l'Informatique et des Libertés (CNIL)
                </p>
                <p className="mt-4">
                  © 2025 <strong className="text-foreground">CoFound</strong> – Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
