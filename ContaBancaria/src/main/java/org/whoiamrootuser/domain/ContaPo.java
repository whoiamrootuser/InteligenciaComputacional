package org.whoiamrootuser.domain;

import java.text.NumberFormat;
import java.util.Locale;

public class ContaPo extends ContaBancaria {
    final private double taxaRendimento;
    public ContaPo(String titular, double saldo, double taxaRendimento) {
        super(titular, saldo);
        this.taxaRendimento = taxaRendimento;
    }

    public void aplicarRendimento() {
        saldo += saldo * taxaRendimento/100;
    }

    @Override
    public String exibeSaldo() {
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
        String formattedSaldo = currencyFormatter.format(saldo);
        String outputMessage = "Saldo da conta poupança de " + titular + ": " + formattedSaldo;
        System.out.println(outputMessage);
        return outputMessage;
    }

}
