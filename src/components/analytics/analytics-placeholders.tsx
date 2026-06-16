export function AnalyticsPlaceholders() {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gscVerificationToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN;
  const conversionLabel = process.env.NEXT_PUBLIC_CONVERSION_LABEL;

  return (
    <>
      {gscVerificationToken ? (
        <meta name="google-site-verification" content={gscVerificationToken} />
      ) : null}
      {gaMeasurementId ? (
        <script
          data-analytics="ga4-placeholder"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaMeasurementId}');`,
          }}
        />
      ) : null}
      {conversionLabel ? (
        <script
          data-analytics="conversion-placeholder"
          dangerouslySetInnerHTML={{
            __html: `window.__conversionTrackingLabel='${conversionLabel}';`,
          }}
        />
      ) : null}
    </>
  );
}
