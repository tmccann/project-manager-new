export const setupModalMocks = () => {
  // create the modal container that is not included in dom
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(portalRoot);
  // create methods that dont exist in dom
  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();
};

export const cleanupModalMocks = () => {
  // remove portal when tests complete
  const portalRoot = document.getElementById("modal-root");
  if (portalRoot) portalRoot.remove();
};
