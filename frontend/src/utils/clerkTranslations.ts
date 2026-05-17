// src/utils/clerkTranslations.ts

export function translateClerkError(code: string): string {
  switch (code) {
    // ==========================================
    // 1. IDENTIFIER / EMAIL ERRORS
    // ==========================================
    case "form_identifier_not_found":
      return "Es wurde kein Konto mit dieser E-Mail-Adresse gefunden.";
      
    case "form_identifier_exists":
      return "Diese E-Mail-Adresse wird bereits von einem anderen Konto verwendet.";
      
    case "form_param_format_invalid":
    case "form_param_invalid":
      return "Das Format der E-Mail-Adresse ist ungültig. Bitte überprüfe deine Eingabe.";

    case "form_param_nil":
      return "Dieses Feld darf nicht leer sein.";


    // ==========================================
    // 2. PASSWORD ERRORS
    // ==========================================
    case "form_password_incorrect":
      return "Das eingegebene Passwort ist nicht korrekt.";

    case "form_password_validation_failed":
      return "Das Passwort entspricht nicht den Sicherheitsrichtlinien.";

    case "form_password_length_too_short":
      return "Das Passwort ist zu kurz. Es muss mindestens 8 Zeichen lang sein.";

    case "password_in_backlist":
    case "form_password_pwned":
      return "Dieses Passwort ist zu einfach oder wurde in Datenlecks gefunden. Bitte wähle ein sichereres Passwort.";


    // ==========================================
    // 3. VERIFICATION / OTP CODES
    // ==========================================
    case "form_code_incorrect":
      return "Der eingegebene Code ist falsch. Bitte überprüfe deine E-Mails erneut.";

    case "verification_expired":
      return "Der Bestätigungscode ist abgelaufen. Bitte fordere einen neuen Code an.";

    case "strategy_not_supported":
      return "Diese Authentifizierungsmethode wird derzeit nicht unterstützt.";


    // ==========================================
    // 4. RATE LIMITING & SECURITY LOCKOUTS
    // ==========================================
    case "resource_forbidden":
      return "Zugriff verweigert. Du hast keine Berechtigung für diese Aktion.";

    case "clerk_ratelimit_error":
    case "too_many_requests":
      return "Zu viele Versuche in kurzer Zeit. Bitte warte einen Moment, bevor du es erneut versuchst.";

    case "user_locked":
      return "Dieses Konto wurde aus Sicherheitsgründen vorübergehend gesperrt. Bitte wende dich an den Support oder versuche es später.";


    // ==========================================
    // 5. SIGN-UP / SESSION CONFLICTS
    // ==========================================
    case "signed_in_user_cannot_sign_up":
      return "Du bist bereits eingeloggt und kannst kein neues Konto registrieren.";


    // ==========================================
    // FALLBACK
    // ==========================================
    default:
      // If Clerk returns a complex error message or a code we haven't explicitly covered
      return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  }
}