package br.com.masterclass.superpecas.model.DTO;

public class PecaDTO {
    private int id;
    private String nome;
    private String descricao;
    private String numeroSerie;
    private String fabricante;
    private String modeloCarro;
    private String carroNomeModelo;
    private String carroFabricante;
    private Integer carroId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getModeloCarro() {
        return modeloCarro;
    }

    public void setModeloCarro(String modeloCarro) {
        this.modeloCarro = modeloCarro;
    }

    public Integer getCarroId() {
        return carroId;
    }

    public void setCarroId(Integer carroId) {
        this.carroId = carroId;
    }

    public String getCarroNomeModelo() {
        return carroNomeModelo;
    }

    public void setCarroNomeModelo(String carroNomeModelo) {
        this.carroNomeModelo = carroNomeModelo;
    }

    public String getCarroFabricante() {
        return carroFabricante;
    }

    public void setCarroFabricante(String carroFabricante) {
        this.carroFabricante = carroFabricante;
    }
}
