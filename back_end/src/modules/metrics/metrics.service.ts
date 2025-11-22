import { prisma } from "../../prisma";

export const metricsService = {

  async escolasRuraisComLabInternet() {
    const result: any = await prisma.$queryRaw<
      { escolas_rurais_com_lab_e_internet: bigint }[]
    >`
      SELECT COUNT(*) AS escolas_rurais_com_lab_e_internet
      FROM escola e
      JOIN infraestrutura_geral ig ON e.id_infraestrutura_geral = ig.id
      JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id
      WHERE e.tp_localizacao = 2
      AND ig.in_laboratorio_informatica = TRUE
      AND ir.in_internet_alunos = TRUE
    `;

    return {
      escolas_rurais_com_lab_e_internet: Number(result[0].escolas_rurais_com_lab_e_internet)
    };
  },

  async mediaComputadoresPorAluno() {
    const result: any = await prisma.$queryRaw<
      { media_computadores_por_aluno: number }[]
    >`
      SELECT
        ROUND(
          AVG(
            eq.qt_desktop_aluno::numeric /
            NULLIF(cd.qt_mat_fund_af + cd.qt_mat_med, 0)
          ), 2
        ) AS media_computadores_por_aluno
      FROM escola e
      JOIN equipamentos eq ON e.id_equipamentos = eq.id
      JOIN corpo_discente cd ON e.id_corpo_discente = cd.id
      JOIN infraestrutura_geral ig ON e.id_infraestrutura_geral = ig.id
      WHERE e.tp_localizacao = 2
      AND ig.in_laboratorio_informatica = TRUE
    `;

    return {
      media_computadores_por_aluno: Number(result[0].media_computadores_por_aluno)
    };
  },

  async totalEscolasNordeste() {
    const result: any = await prisma.$queryRaw<
      { total_escolas_nordeste: bigint }[]
    >`
      SELECT COUNT(*) AS total_escolas_nordeste
      FROM endereco
      WHERE sg_uf IN ('BA','SE','AL','PE','PB','RN','CE','PI','MA')
    `;

    return {
      total_escolas_nordeste: Number(result[0].total_escolas_nordeste)
    }
  },

  async totalEscolasNordestRural() {
    const result: any = await prisma.$queryRaw<
      { total_escolas_nordeste: bigint }[]
    >`
      SELECT COUNT(*) AS total_escolas_nordeste
      FROM escola
      WHERE tp_localizacao = 2
    `;

    return {
      total_escolas_nordeste: Number(result[0].total_escolas_nordeste)
    }
  },

  async detalhesInfraRural() {
    const bandaLarga: any = await prisma.$queryRaw<
      { total_sem_banda_larga: bigint }[]
    >`
      SELECT COUNT(*) AS total_sem_banda_larga
      FROM escola e
      JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id 
      WHERE e.tp_localizacao = 2
      AND ir.in_banda_larga = FALSE
    `;

    const redeLocal: any = await prisma.$queryRaw<
      { total_rede_local: bigint }[]
    >`
      SELECT COUNT(*) AS total_rede_local
      FROM escola e
      JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id 
      WHERE e.tp_localizacao = 2
      AND ir.tp_rede_local = TRUE
    `;

    const bandaLargaERedeLocal: any = await prisma.$queryRaw<
      { total_rede_local_sem_banda_larga: bigint }[]
    >`
      SELECT COUNT(*) AS total_rede_local_sem_banda_larga
      FROM escola e 
      JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id 
      WHERE e.tp_localizacao = 2
        AND ir.tp_rede_local = TRUE
        AND ir.in_banda_larga = FALSE
    `;

    return {
      total_sem_banda_larga: Number(bandaLarga[0].total_sem_banda_larga),
      total_rede_local: Number(redeLocal[0].total_rede_local),
      total_rede_local_sem_banda_larga: Number(bandaLargaERedeLocal[0].total_rede_local_sem_banda_larga)
    };
  },

  async detalhesInternetBandaLarga(){
    const totalRuraisComRedeLocalSemBandaLarga: any = await prisma.$queryRaw<
      { total: bigint }[]
    >`
      SELECT COUNT(*) AS total
      FROM escola e
      JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id
      WHERE e.tp_localizacao = 2
        AND ir.tp_rede_local = TRUE
        AND ir.in_banda_larga = FALSE
    `;

    const totalRuraisComRedeLocal: any = await prisma.$queryRaw<
    { total: bigint }[]
    >`
      SELECT COUNT(*) AS total
      FROM escola e
      JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id
      WHERE e.tp_localizacao = 2
        AND ir.tp_rede_local = TRUE
    `;
    
      const totalRuraisSemBandaLarga: any = await prisma.$queryRaw<
      { total: bigint }[]
    >`
      SELECT COUNT(*) AS total
      FROM escola e
      JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id
      WHERE e.tp_localizacao = 2
        AND ir.in_banda_larga = FALSE
    `;
    return {
      rurais_com_rede_local_sem_banda_larga: Number(totalRuraisComRedeLocalSemBandaLarga[0].total),
      rurais_com_rede_local: Number(totalRuraisComRedeLocal[0].total),
      rurais_sem_banda_larga: Number(totalRuraisSemBandaLarga[0].total)
    };
  },

 async listaEscolas() {
  const result = await prisma.$queryRaw<
    {
      nome_escola: string;
      possui_laboratorio: boolean;
      possui_internet: boolean;
    }[]
  >`
    SELECT 
      e.no_entidade AS nome_escola,
      ig.in_laboratorio_informatica AS possui_laboratorio,
      ir.in_internet_alunos AS possui_internet
    FROM escola e
    JOIN infraestrutura_geral ig ON e.id_infraestrutura_geral = ig.id
    JOIN infraestrutura_rede ir ON e.id_infraestrutura_rede = ir.id
    LIMIT 500;
  `;

  return result.map((row: { nome_escola: any; possui_laboratorio: any; possui_internet: any; }) => ({
    nome_escola: row.nome_escola,
    possui_laboratorio: Boolean(row.possui_laboratorio),
    possui_internet: Boolean(row.possui_internet)
  }));
}
}
