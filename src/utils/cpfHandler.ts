function formatCpf(cpf: string) {
  return cpf.replaceAll('.', '').replace('-', '');
}

export { formatCpf };
