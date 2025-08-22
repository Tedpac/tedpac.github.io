/**
 * Decodes and displays the email address when the button for showing the email address is clicked.
 * It removes the button and replaces it with a mailto link containing the decoded email address.
 */
function showEmailAddress() {
  const x = ["bmlj", "b2xh"];
  const y = ["c0B0", "ZWRw"];
  const z = ["YWMu", "eHl6"];
  const emailAddress = atob([...x, ...y, ...z].join(""));

  const emailAddressLink = document.createElement("a");
  emailAddressLink.href = `mailto:${emailAddress}`;
  emailAddressLink.textContent = emailAddress;

  const showEmailAddressButton = document.getElementById("show-email-address");
  showEmailAddressButton.parentNode.removeChild(showEmailAddressButton);
  document.getElementById("email-address").appendChild(emailAddressLink);
}

function initializeEmailAddressHandler() {
  document.getElementById("show-email-address").addEventListener("click", showEmailAddress);
}

export { initializeEmailAddressHandler };
