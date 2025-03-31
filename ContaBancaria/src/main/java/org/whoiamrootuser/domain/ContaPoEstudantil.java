package org.whoiamrootuser.domain;

import java.text.NumberFormat;
import java.util.Locale;

public class ContaPoEstudantil extends ContaPo {
    final private double limiteIsencaoTaxa;
    public ContaPoEstudantil(String titular, double saldo, double taxaRendimento, double limiteIsencaoTaxa) {
        super(titular, saldo, taxaRendimento);
        this.limiteIsencaoTaxa = limiteIsencaoTaxa;
    }

    @Override
    public boolean sacar(double valor) {
        return super.sacar(valor);
    }

    public String exibeLimiteIsencao(){
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
        String formattedLimiteIsencao = currencyFormatter.format(limiteIsencaoTaxa);
        String outputMessage = "\"Limite de isenção de taxa para estudantes: " +  formattedLimiteIsencao;
        System.out.println(outputMessage);
        return outputMessage;
    }
}
