export interface Grade {
      id: number,
      student: string,
      subject: string,
      type: string,
      value: number,
      timestamp: string
}

export interface CriarGradeInput {
      student: string,
      subject: string,
      type: string,
      value: number
}