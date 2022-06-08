export class EnvelopeDTO {
  static build(params: { status: number; data?: any; errors?: any[] }): any {
    return {
      status: params.status,
      ...(params.data && { data: params.data }),
      ...(params.errors && { errors: params.errors }),
    }
  }
}
