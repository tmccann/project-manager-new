export const setupModalMocks = () => {
  // Create the modal container that is not included in dom
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(portalRoot);
  // Create methods that dont exist in dom
  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();
};

export const cleanupModalMocks = () => {
  // Remove portal when tests complete
  const portalRoot = document.getElementById("modal-root");
  if (portalRoot) portalRoot.remove();
};
