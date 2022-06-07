export class EnvelopeDTO {
  static build(params: { status: number; data?: any; errors?: any[] }): any {
    return {
      status: params.status,
      data: params.data || null,
      errors: params.errors || [],
    }
  }
}
