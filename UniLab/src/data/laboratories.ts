import {
  Cpu,
  Camera,
  Zap,
  Gamepad2,
  Printer,
  Wrench,
  Beaker,
  Microscope,
  TestTube,
} from 'lucide-react'
import { Laboratory, SpecialResource } from '@/types'

export const laboratories: Laboratory[] = [
  {
    id: 1,
    name: "Laboratório de Informática I",
    icon: Cpu,
    location: "Bloco A - Sala 101",
    status: "open",
    course: "Ciência da Computação",
    type: "Informática",
    description:
      "Laboratório equipado com computadores de última geração para desenvolvimento de software e programação.",
    equipment: [
      { name: "Computadores Dell", icon: Cpu, quantity: 30 },
      { name: "Projetores", icon: Camera, quantity: 2 },
      { name: "Quadro Interativo", icon: Zap, quantity: 1 },
    ],
    schedule: "Segunda a Sexta: 8h às 22h",
    responsible: "Prof. Dr. João Silva",
    images: ["/unimarlab1.jpg"],
  },
  {
    id: 3,
    name: "Laboratório de Inteligência Artificial",
    icon: Gamepad2,
    location: "Bloco 5 - Sala 220",
    status: "open",
    course: "Bachalerado em IA",
    type: "Robótica",
    description: "Espaço dedicado ao desenvolvimento de projetos de robótica e automação industrial.",
    equipment: [
      { name: "Kits Arduino", icon: Cpu, quantity: 25 },
      { name: "Impressoras 3D", icon: Printer, quantity: 5 },
      { name: "Sensores Diversos", icon: Zap, quantity: 100 },
    ],
    schedule: "Segunda a Sábado: 8h às 20h",
    responsible: "Prof. Dr. Carlos Oliveira",
    images: ["/unimarlab2.jpeg"],
  },
  {
    id: 4,
    name: "Laboratório de Microscopia",
    icon: Microscope,
    location: "Bloco D - Sala 401",
    status: "open",
    course: "Biologia",
    type: "Microscopia",
    description: "Laboratório especializado em análise microscópica e pesquisa biológica.",
    equipment: [
      { name: "Microscópios Eletrônicos", icon: Microscope, quantity: 8 },
      { name: "Microscópios Ópticos", icon: Microscope, quantity: 20 },
      { name: "Câmeras Digitais", icon: Camera, quantity: 12 },
    ],
    schedule: "Segunda a Sexta: 8h às 18h",
    responsible: "Prof. Dra. Ana Costa",
    images: ["/unimarlab3.jpg"],
  },
  {
    id: 5,
    name: "Laboratório de Eletrônica",
    icon: Zap,
    location: "Bloco E - Sala 201",
    status: "open",
    course: "Engenharia Elétrica",
    type: "Eletrônica",
    description: "Laboratório para desenvolvimento e teste de circuitos eletrônicos e sistemas embarcados.",
    equipment: [
      { name: "Osciloscópios", icon: Zap, quantity: 15 },
      { name: "Multímetros", icon: Wrench, quantity: 30 },
      { name: "Fontes de Alimentação", icon: Zap, quantity: 20 },
    ],
    schedule: "Segunda a Sexta: 7h às 21h",
    responsible: "Prof. Dr. Roberto Lima",
    images: ["/unimarlab4.jpeg"],
  },
  
]

export const specialResources: SpecialResource[] = [
  {
    title: "Impressoras 3D Profissionais",
    description: "5 impressoras 3D de alta precisão para prototipagem",
    icon: Printer,
    color: "bg-accent",
  },
  {
    title: "Kits de Robótica Avançados",
    description: "Equipamentos Arduino, Raspberry Pi e sensores IoT",
    icon: Gamepad2,
    color: "bg-primary",
  },
  {
    title: "Servidores de Alto Desempenho",
    description: "Cluster computacional para processamento intensivo",
    icon: Cpu,
    color: "bg-secondary",
  },
  {
    title: "Microscópios Eletrônicos",
    description: "Equipamentos de última geração para análise microscópica",
    icon: Microscope,
    color: "bg-destructive",
  },
]
