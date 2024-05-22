package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.model.DTO.TopFabricantesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarroRepository extends JpaRepository<CarroModel, Integer> {

    CarroModel findByNomeModelo(String nomeModelo);

    CarroModel findByNomeModeloOrCodigoUnico(String nomeModelo, String codigoUnico);

    Page<CarroModel> findAll(Pageable pageable);

    @Query("SELECT c FROM CarroModel c WHERE lower(c.nomeModelo) like lower(concat('%', ?1,'%')) OR (?1 IS NULL OR lower(c.fabricante) like lower(concat('%', ?1,'%')))")
    Page<CarroModel> findByNomeModeloEOuFabricante(String nome, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT c.fabricante FROM carros c GROUP BY c.fabricante")
    List<String> findAllFabricantes();

    @Query(nativeQuery = true, value = "SELECT Count(CarroID) 'quantidade', fabricante FROM carros GROUP BY fabricante ORDER BY Count(CarroID) DESC LIMIT 10")
    List<TopFabricantesDTO> findTop10Fabricantes();
}
