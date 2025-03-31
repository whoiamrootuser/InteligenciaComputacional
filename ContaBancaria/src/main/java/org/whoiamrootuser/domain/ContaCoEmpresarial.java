package org.whoiamrootuser.domain;

import java.text.NumberFormat;
import java.util.Locale;

public class ContaCoEmpresarial extends ContaCo {
    final private double taxaJurosEmprestimo;
    public ContaCoEmpresarial(String titular, double saldo, double limiteChequeEspecial, double taxaJurosEmprestimo) {
        super(titular, saldo, limiteChequeEspecial);
        this.taxaJurosEmprestimo = taxaJurosEmprestimo;
    }

    public boolean solicitaEmprestimo(double valorEmprestimo) {
        double saldoDisponivel = saldo + limiteChequeEspecial;
        if(saldoDisponivel >= valorEmprestimo) {
            saldo += valorEmprestimo;
            return true;
        }
        return false;
    }

    @Override
    public String exibeSaldo() {
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
        String formattedSaldo = currencyFormatter.format(saldo);
        String outputMessage = "Saldo da conta empresarial de " + titular + ": " + formattedSaldo;
        System.out.println(outputMessage);
        return outputMessage;
    }
}
