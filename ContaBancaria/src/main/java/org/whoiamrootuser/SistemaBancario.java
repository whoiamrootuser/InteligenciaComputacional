package org.whoiamrootuser;

import org.whoiamrootuser.domain.*;

import java.util.Scanner;

public class SistemaBancario {
    public static void main(String[] args) {
        menu();
    }

    public static void menu() {
        String TITULAR = "João Henrique";
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Selecione o tipo de conta:");
            System.out.println("1. Conta Bancária");
            System.out.println("2. Conta Poupança");
            System.out.println("3. Conta Poupança Estudantil");
            System.out.println("4. Conta Corrente");
            System.out.println("5. Conta Corrente Premium");
            System.out.println("6. Conta Corrente Empresarial");
            System.out.println("7. Sair");

            int opcao = scanner.nextInt();
            if (opcao == 7) {
                System.out.println("Saindo...");
                break;
            }

            switch (opcao) {
                case 1:
                    subMenu(new ContaBancaria(TITULAR, 1000));
                    break;
                case 2:
                    subMenu(new ContaPo(TITULAR, 1500, 0.95));
                    break;
                case 3:
                    subMenu(new ContaPoEstudantil(TITULAR,500, 0.95, 120));
                    break;
                case 4:
                    subMenu(new ContaCo(TITULAR, 2000, 4000));
                    break;
                case 5:
                    subMenu(new ContaCoPremium(TITULAR, 2500, 5000, 5));
                    break;
                case 6:
                    subMenu(new ContaCoEmpresarial(TITULAR, 18000, 10000, 2));
                    break;
                default:
                    System.out.println("Opção inválida.");
                    break;
            }
        }
    }

    public static void subMenu(ContaBancaria conta) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Selecione uma operação:");
            System.out.println("1. Depositar");
            System.out.println("2. Sacar");
            System.out.println("3. Exibir Saldo");

            if (conta instanceof ContaPo) {
                System.out.println("4. Aplicar Rendimento");
            }
            if (conta instanceof ContaPoEstudantil) {
                System.out.println("5. Exibir Limite de Isenção");
            }
            if (conta instanceof ContaCo) {
                System.out.println("4. Exibir Limite Cheque Especial");
            }
            if (conta instanceof ContaCoPremium) {
                System.out.println("5. Exibir Benefício Premium");
            }
            if (conta instanceof ContaCoEmpresarial) {
                System.out.println("5. Solicitar Empréstimo");
            }
            System.out.println("6. Voltar ao menu principal");

            int opcao = scanner.nextInt();
            try {
                switch (opcao) {
                    case 1:
                        System.out.print("Digite o valor do depósito: ");
                        double deposito = scanner.nextDouble();
                        conta.depositar(deposito);
                        break;
                    case 2:
                        System.out.print("Digite o valor do saque: ");
                        double saque = scanner.nextDouble();
                        boolean sacou = conta.sacar(saque);
                        if (sacou) {
                            System.out.println("Saque realizado com sucesso!");
                        }else {
                            System.out.println("Não foi possivel realizar o saque, saldo insuficiente!");
                        }
                        break;
                    case 3:
                        conta.exibeSaldo();
                        break;
                    case 4:
                        if (conta instanceof ContaPo) {
                            ((ContaPo) conta).aplicarRendimento();
                        } else if (conta instanceof ContaCo) {
                            ((ContaCo) conta).exibeLimiteChequeEspecial();
                        }
                        break;
                    case 5:
                        if (conta instanceof ContaPoEstudantil) {
                            ((ContaPoEstudantil) conta).exibeLimiteIsencao();
                        } else if (conta instanceof ContaCoPremium) {
                            ((ContaCoPremium) conta).exibeBeneficioPremium();
                        } else if (conta instanceof ContaCoEmpresarial) {
                            System.out.print("Digite o valor do emprestimo: ");
                            double valorEmprestimo = scanner.nextDouble();
                            boolean emprestou = ((ContaCoEmpresarial) conta).solicitaEmprestimo(valorEmprestimo);
                            if (emprestou) {
                                System.out.println("Emprestimo realizado com sucesso.");
                            } else {
                                throw new MinhasExcecoes("Não foi possivel realizar o empréstimo");
                            }
                        }
                        break;
                    case 6:
                        System.out.println("Voltando ao menu principal...");
                        return;
                    default:
                        System.out.println("Opção inválida.");
                        break;
                }
            } catch (MinhasExcecoes e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
