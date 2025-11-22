import { Request, Response } from "express";
import { metricsService } from "./metrics.service";

export async function getEscolasRuraisLabInternet(req: Request, res: Response) {
  const data = await metricsService.escolasRuraisComLabInternet();
  res.json(data);
}

export async function getMediaComputadoresPorAluno(req: Request, res: Response) {
  const data = await metricsService.mediaComputadoresPorAluno();
  res.json(data);
}

export async function getTotalEscolasNordeste(req: Request, res: Response) {
  const data = await metricsService.totalEscolasNordeste();
  res.json(data);
}

export async function getTotalEscolasNordesteRural(req: Request, res: Response) {
  const data = await metricsService.totalEscolasNordestRural();
  res.json(data);
}

export async function getDetalhesInfraRural(req: Request, res: Response) {
  const data = await metricsService.detalhesInfraRural();
  res.json(data);
}

export async function getDetalhesInternetBandaLarga(req: Request, res: Response) {
  const data = await metricsService.detalhesInternetBandaLarga();
  res.json(data);
}

export async function getListaEscolas(req: Request, res: Response) {
  const data = await metricsService.listaEscolas();
  res.json(data);
}